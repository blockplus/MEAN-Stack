module DonationsHelper
  def donation_title(donation)
    suggested_donation = SuggestedDonation.find_by_amount(donation.amount)
    title = suggested_donation.present? ? suggested_donation.title : "#{number_to_currency(donation.amount)} Donation"
    title
  end
end
