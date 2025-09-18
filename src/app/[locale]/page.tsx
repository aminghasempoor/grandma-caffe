import Login from "@/components/login";
import WithoutAuthMiddleware from "@/components/middlewares/WithoutAuthMiddleware";

export default function Home() {
    return (
        <>
            <WithoutAuthMiddleware>
                <Login />
            </WithoutAuthMiddleware>
        </>
    );
}
