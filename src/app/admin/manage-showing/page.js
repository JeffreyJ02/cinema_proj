import ManageShowing from './ManageShowing';
import checkAdmin from "@/middleware/checkAdmin";

export default async function Home() {
    console.log("Checking admin status page");
    const isAdmin = await checkAdmin();
    console.log("isAdmin:", isAdmin);


    if (!isAdmin) {
        return <div>Access denied. You do not have permission to manage movies.</div>;
    }
    return (
        <div>
            <h1>        </h1>
            <ManageShowing />
        </div>
    );
}