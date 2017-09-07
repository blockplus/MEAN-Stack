require 'test_helper'

class DonationMailerTest < ActionMailer::TestCase
  test "thank" do
    mail = DonationMailer.thank
    assert_equal "Thank", mail.subject
    assert_equal ["to@example.org"], mail.to
    assert_equal ["from@example.com"], mail.from
    assert_match "Hi", mail.body.encoded
  end

end
