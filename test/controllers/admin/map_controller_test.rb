require "test_helper"

class Admin::MapControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get admin_map_index_url
    assert_response :success
  end
end
