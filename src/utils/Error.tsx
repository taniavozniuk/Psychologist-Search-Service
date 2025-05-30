export const handleError = (error: unknown): string => {
  if (error instanceof Error) {
    switch (error.message) {
      case "No internet connection":
        return "No internet connection. Please check your network.";
      case "Failed to fetch":
        return "Network error. The server might be unavailable.";
      case "Internal Server Error":
        return "Something went wrong on the server.";
      // case "Internal Server Error":
      //   return "You already have booked meeting for this date and time.";
      default:
        return "Server is not responding. Please try again later.";
    }
  } else {
    return "An unexpected error occurred.";
  }
};
