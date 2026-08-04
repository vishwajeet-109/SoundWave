import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import dashboardService from "../services/dashboardService.js";

class DashboardController {
  userDashboard = asyncHandler(async (req, res) => {
    const dashboard = await dashboardService.getUserDashboard(req.user._id);
    res.status(200).json(new ApiResponse(200, "User Dashboard", dashboard));
  });

  artistDashboard = asyncHandler(async (req, res) => {
    const dashboard = await dashboardService.getArtistDashboard(req.user._id);
    res.status(200).json(new ApiResponse(200, "Artist Dashboard", dashboard));
  });

  adminDashboard = asyncHandler(async (req, res) => {
    const dashboard = await dashboardService.getAdminDashboard();
    res.status(200).json(new ApiResponse(200, "Admin Dashboard", dashboard));
  });

  superAdminDashboard = asyncHandler(async (req, res) => {
    const dashboard = await dashboardService.getAdminDashboard();
    res.status(200).json(new ApiResponse(200, "Super Admin Dashboard", dashboard));
  });
}

export default new DashboardController();