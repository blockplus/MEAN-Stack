.. :changelog:

History
-------

As of 2013.02.09, releases with breaking changes will be noted with ``**``.

2013.02.XX
**********

2013.02.15
**********

- user now controls logging (`docs
  <https://unofficial-google-music-api.readthedocs.org/en
  /latest/#gmusicapi.api.Api.__init__>`__)

- documentation overhaul

2013.02.14
++++++++++

- fix international logins

2013.02.12
++++++++++

- fix packaging issues

2013.02.11
++++++++++

- improve handling of strange metadata when uploading
- add a dependency on `dateutil <http://labix.org/python-dateutil>`__

``**`` 2013.02.09
+++++++++++++++++

- breaking: upload returns a 3-tuple (`docs
  <https://unofficial-google-music-api.readthedocs.org/en
  /latest/#gmusicapi.api.Api.upload>`__)

- breaking: get_all_playlist_ids always returns lists of ids; remove always_id_lists option
  (`docs <https://unofficial-google-music-api.readthedocs.org/en
  /latest/#gmusicapi.api.Api.get_all_playlist_ids>`__)

- breaking: remove suppress_failure option in Api.__init__
- breaking: copy_playlist ``orig_id`` argument renamed to ``playlist_id`` (`docs
  <https://unofficial-google-music-api.readthedocs.org/en
  /latest/#gmusicapi.api.Api.copy_playlist>`__)

- new: report_incorrect_match (only useful for Music Manager uploads) (`docs
  <https://unofficial-google-music-api.readthedocs.org/en
  /latest/#gmusicapi.api.Api.report_incorrect_match>`__)

- uploading fixed
- avconv replaces ffmpeg
- scan and match is supported
- huge code improvements

2013.01.05
++++++++++

- compatibility update for playlist mutation
- various metadata compatibility updates

2012.11.09
++++++++++

- bugfix: support for uploading uppercase filenames (Tom Graham)
- bugfix: fix typo in multidownload validation, and add test

2012.08.31
++++++++++

- metadata compatibility updates (storeId, lastPlayed)
- fix uploading of unicode filenames without tags

2012.05.04
++++++++++

- update allowed rating values to 1-5 (David Dooling)
- update metajamId to matchedId (David Dooling)
- fix broken expectation about disc/track numbering metadata

2012.04.03
++++++++++

- change to the 3-clause BSD license
- add Kevin Kwok to AUTHORS

2012.04.01
++++++++++

- improve code in example.py
- support uploading of all Google-supported formats: m4a, ogg, flac, wma, mp3. Non-mp3 are transcoded to 320kbs abr mp3 using ffmpeg
- introduce dependency on ffmpeg. for non-mp3 uploading, it needs to be in path and have the needed transcoders available
- get_playlists is now get_all_playlist_ids, and is faster
- add an exception CallFailure. Api functions raise it if the server says their request failed
- add suppress_failure (default False) option to Api.__init__()
- change_playlist now returns the changed playlistId (pid)
- change_song_metadata now returns a list of changed songIds (sids)
- create_playlist now returns the new pid
- delete_playlist now returns the deleted pid
- delete_songs now returns a list of deleted sids
- change_playlist now returns the pid of the playlist - which may differ from the one passed in
- add_songs_to_playlist now returns a list of (sid, new playlistEntryId aka eid) tuples of added songs
- remove_songs_from_playlist now returns a list of removed (sid, eid) pairs
- search dictionary is now flattened, without the "results" key. see documentation for example

2012.03.27
++++++++++

- package for pip/pypi
- add AUTHORS file
- remove session.py; the sessions are now just api.PlaySession (Darryl Pogue)
- protocol.Metadata_Expectations.get_expectation will return UnknownExpectation when queried for unknown keys; this should prevent future problems
- add immutable 'subjectToCuration' and 'metajamId' fields - use unknown

2012.03.16
++++++++++

- add change_playlist for playlist modifications
- get_playlists supports multiple playlists of the same name by returning lists of playlist ids. By default, it will return a single string (the id) for unique playlist names; see the always_id_lists parameter.
- api.login now attempts to bump Music Manager authentication first, bypassing browser emulation. This allows for much faster authentication.
- urls updated for the change to Google Play Music
- remove_songs_from_playlist now takes (playlist_id, song_ids), for consistency with other playlist mutations

2012.03.04
++++++++++

- change name to gmusicapi to avoid ambiguity
- change delete_song and remove_song_from_playlist to delete_songs and remove_songs_from_playlist, for consistency with other functions
- add verification of WC json responses
- setup a sane branch model. see http://nvie.com/posts/a-successful-git-branching-model/
- improve logging
