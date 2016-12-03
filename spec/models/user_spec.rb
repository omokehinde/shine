require "rails_helper"
require "support/violate_check_constraint_matcher"
# require "rspec"


describe User do
	describe "email" do
		let(:users) {
			User.create!(email: "foo@example.com", password: "qwertyuiop", password_confirmation: "qwertyuiop")
		}
		# it "absolutely prevents invalid email addresses" do
		# 	expect {
		# 		user.update_attribute(:email, "foo@bar.com")
		# 	}.to raise_error(ActiveRecord::StatementInvalid, /email_must_be_company_email/i)
		# end
		it "absolutely prevents invalid email addresses" do
			expect {
				users.update_attribute(:email, "foo@bar.com")
		}.to violate_check_constraint(:email_must_be_company_email)
		end
	end
end

