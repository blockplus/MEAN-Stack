#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""A test harness for checking that api calls mutate the server
in the expected fashion. Unit testing is also performed.

A successful test run should not appear to mutate the library
when it is finished, but no guarantees are made."""


import copy
from glob import glob
import logging
import os
import random
import string
import sys
import time
import unittest

from gmusicapi.protocol.metadata import md_expectations
from ..test import utils as test_utils

#unittest.main() will set __name__ to '__main__'; use a static name
log = logging.getLogger('gmusicapi.test.integration_test_api')

#Test files are located in the same directory as this test runner.
cwd = os.getcwd()
os.chdir(os.path.dirname(sys.argv[0]))
test_filenames = glob(u'audiotest*')
os.chdir(cwd)


class TestWCApiCalls(test_utils.BaseTest):

    @classmethod
    def setUpClass(cls):
        super(TestWCApiCalls, cls).setUpClass()

        #Get the full path of the test files.
        #Can't use abspath since this is relative to where _this_ file is,
        # not necessarily the calling curdir.
        path = os.path.realpath(__file__)
        real_path = lambda lp: path[:string.rfind(path, os.sep)] + os.sep + lp
        cls.test_filenames = map(real_path, test_filenames)

    #---
    #   Monolithic tests:
    #   (messy, but less likely to destructively modify the library)
    #   Modified from http://stackoverflow.com/questions/5387299/python-unittest-testcase-execution-order
    #---

    def pl_1_create(self):
        """Create a playlist."""
        self.api.create_playlist('test playlist')

        #Need to reload playlists so it appears.
        self.playlists = self.api.get_all_playlist_ids()['user']


    def pl_2_add_song(self):
        """Add a random song to the playlist."""
        p_id = self.playlists['test playlist'][-1]

        self.api.add_songs_to_playlist(p_id, self.r_song_id)

        #Verify the playlist has it.
        tracks = self.api.get_playlist_songs(p_id)

        self.assertEqual(tracks[0]["id"], self.r_song_id)


    def pl_2a_remove_song(self):
        """Remove a song from the playlist."""
        p_id = self.playlists['test playlist'][-1]

        sid = self.api.get_playlist_songs(p_id)[0]["id"]

        self.api.remove_songs_from_playlist(p_id, sid)

        #Verify.
        tracks = self.api.get_playlist_songs(p_id)

        self.assertEqual(len(tracks), 0)

    def pl_3_change_name(self):
        """Change the playlist's name."""
        p_id = self.playlists['test playlist'][-1]

        self.api.change_playlist_name(p_id, 'modified playlist')

        self.playlists = self.api.get_all_playlist_ids()['user']

    def pl_4_delete(self):
        """Delete the playlist."""
        self.api.delete_playlist(self.playlists['modified playlist'][-1])

        self.playlists = self.api.get_all_playlist_ids()['user']


    def test_playlists(self):
        self.run_steps("pl")

    def cpl_1_create(self):
        """Create and populate a random playlist."""
        self.api.create_playlist('playlist to change')

        #Need to reload playlists so it appears.
        self.playlists = self.api.get_all_playlist_ids()['user']

        p_id = self.playlists['playlist to change'][-1]

        self.api.add_songs_to_playlist(p_id, [s["id"] for s in random.sample(self.library, 10)])

    def cpl_2_change(self):
        """Change the playlist with random deletions, additions and reordering."""
        p_id = self.playlists['playlist to change'][-1]
        tracks = self.api.get_playlist_songs(p_id)

        #Apply random modifications.
        delete, add_dupe, add_blank, reorder = [random.choice([True, False]) for i in xrange(4)]

        if tracks and delete:
            log.debug("deleting tracks")
            track_is = range(len(tracks))
            #Select a random number of indices to delete.
            del_is = set(random.sample(track_is, random.choice(track_is)))
            tracks = [track for i, track in enumerate(tracks) if not i in del_is]

        if add_dupe:
            log.debug("adding dupe tracks from same playlist")
            tracks.extend(random.sample(tracks, random.randrange(len(tracks))))

        if add_blank:
            log.debug("adding random tracks with no eid")
            tracks.extend(random.sample(self.library, random.randrange(len(tracks))))

        if reorder:
            log.debug("shuffling tracks")
            random.shuffle(tracks)

        self.api.change_playlist(p_id, tracks)

        server_tracks = self.api.get_playlist_songs(p_id)

        self.assertEqual(len(tracks), len(server_tracks))

        for local_t, server_t in zip(tracks, server_tracks):
            self.assertEqual(local_t['id'], server_t['id'])

    def cpl_3_delete(self):
        """Delete the playlist."""
        self.api.delete_playlist(self.playlists['playlist to change'][-1])

        self.playlists = self.api.get_all_playlist_ids()['user']

    def test_change_playlist(self):
        self.run_steps("cpl")

    def updel_1_upload(self):
        """Upload test files."""

        uploaded, matched, not_uploaded = self.api.upload(self.test_filenames)
        if not_uploaded:
            self.fail("upload failed: %s" % not_uploaded)

        #A bit messy; need to pass the ids on to the next step.
        self.uploaded_ids = uploaded.values() + matched.values()

    def updel_1a_get_dl_info(self):
        """Check how many times the newly uploaded songs have been
        downloaded."""
        #gross - upload servers need time to sync
        time.sleep(15)

        info_tuples = [self.api.get_song_download_info(sid) for sid in
                       self.uploaded_ids]

        for info_tuple in info_tuples:
            self.assertNotEqual(info_tuple[0], None, 'should be available for download')

    def updel_2_delete(self):
        """Delete the uploaded test files."""
        self.api.delete_songs(self.uploaded_ids)
        del self.uploaded_ids

    def test_up_deletion(self):
        self.run_steps("updel_")

    #---
    #   Non-monolithic tests:
    #---

    #Works, but the protocol isn't mature enough to support the call (yet).
    def test_get_song_download_info(self):
         #The api doesn't expose the actual response here,
         # instead we expect a tuple with 2 entries.
         res = self.api.get_song_download_info(self.r_song_id)
         self.assertEqual(len(res), 2)
         self.assertIsInstance(res, tuple)

    def test_change_song_metadata(self):
        """Change a song's metadata, then restore it."""
        #Get a random song's metadata.
        orig_md = [s for s in self.library if s["id"] == self.r_song_id][0]
        log.debug("original md: %s", repr(orig_md))

        #Generate noticably changed metadata for ones we can change.
        #Changing immutable ones voids the request (although we get back success:True and our expected values).
        new_md = copy.deepcopy(orig_md)

        for name, expt in md_expectations.items():
            if name in orig_md and expt.mutable:
                old_val = orig_md[name]
                new_val = test_utils.modify_md(name, old_val)

                log.debug("%s: %s modified to %s", name, repr(old_val), repr(new_val))
                self.assertNotEqual(new_val, old_val)
                new_md[name] = new_val

        #Make the call to change the metadata.
        #This should succeed, even though we _shouldn't_ be able to change some entries.
        #The call only fails if you give the wrong datatype.
        self.api.change_song_metadata(new_md)


        #Recreate the dependent md to what they should be (based on how orig_md was changed)
        correct_dependent_md = {}
        for name, expt in md_expectations.items():
            if expt.depends_on and name in orig_md:
                master_name = expt.depends_on
                correct_dependent_md[name] = expt.dependent_transformation(new_md[master_name])

                # master_key, trans = dependent_md[name]
                # correct_dependent_md[dep_key] = trans(new_md[master_key])

                log.debug("dependents (%s): %s -> %s", name, new_md[master_name], correct_dependent_md[name])

        #The library needs to be refreshed to flush the changes.
        #This might not happen right away, so we allow a few retries.

        max_attempts = 3
        sleep_for = 3

        attempts = 0
        success = False

        #TODO: this is cludgey, and should be pulled out with the below retry logic.
        while not success and attempts < max_attempts:
            time.sleep(sleep_for)
            self.library = self.api.get_all_songs()

            attempts += 1

            result_md = [s for s in self.library if s["id"] == orig_md["id"]][0]
            log.debug("result md: %s", repr(result_md))


            try:
                #Verify everything went as expected:
                for name, expt in md_expectations.items():
                    if name in orig_md:
                        #Check mutability if it's not volatile or dependent.
                        if not expt.volatile and expt.depends_on is None:
                            same, message = test_utils.md_entry_same(name, orig_md, result_md)
                            self.assertEqual(same, (not expt.mutable), "metadata mutability incorrect: " + message)

                        #Check dependent md.
                        if expt.depends_on is not None:
                            same, message = test_utils.md_entry_same(name, correct_dependent_md, result_md)
                            self.assertTrue(same, "dependent metadata incorrect: " + message)

            except AssertionError:
                log.info("retrying server for changed metadata")
                if not attempts < max_attempts: raise
            else:
                success = True


        #Revert the metadata.
        self.api.change_song_metadata(orig_md)

        #Verify everything is as it was.

        attempts = 0
        success = False

        while not success and attempts < max_attempts:
            time.sleep(sleep_for)
            self.library = self.api.get_all_songs()

            attempts += 1

            result_md = [s for s in self.library if s["id"] == orig_md["id"]][0]
            log.debug("result md: %s", repr(result_md))

            try:
                for name in orig_md:
                    #If it's not volatile, it should be back to what it was.
                    if not md_expectations[name].volatile:
                        same, message = test_utils.md_entry_same(name, orig_md, result_md)
                        self.assertTrue(same, "failed to revert: " + message)

            except AssertionError:
                log.info("retrying server for reverted metadata")
                if not attempts < max_attempts:
                    raise
            else:
                success = True

    def test_search(self):
        self.api.search('e')

    def test_get_stream_url(self):
        #This should return a valid url.
        #This is not robust; it's assumed that invalid calls will raise an error before this point.
        url = self.api.get_stream_url(self.r_song_id)
        self.assertTrue(url[:4] == "http")


if __name__ == '__main__':

    #Fail the build if any log messages above warning are sent.
    root_logger = logging.getLogger('gmusicapi')

    noticer = test_utils.NoticeLogging()
    noticer.setLevel(logging.WARNING)
    root_logger.addHandler(noticer)

    result = unittest.main(exit=False).result

    if noticer.seen_message:
        print '(failing build due to log warnings)'
        sys.exit(1)

    sys.exit(not result.wasSuccessful())
