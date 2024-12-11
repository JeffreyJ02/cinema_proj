import { cookies } from "next/headers";

const checkAdmin = async (req, res, next) => {
  console.log("Checking admin status");
  console.log("Email checkAdmin: ", cookies().get("userEmail")?.value);
  try {
    const userEmail = cookies().get("userEmail")?.value;
    const response = await fetch(
      `http://localhost:8080/api/get-user-admin-status?email=${userEmail}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch admin status");
    }

    const adminStatus = await response.json();
    console.log("Admin status:", adminStatus);
    return adminStatus === 1; 
  } catch (error) {
    console.error("Error fetching admin status:", error);
  }
};

module.exports = checkAdmin;
