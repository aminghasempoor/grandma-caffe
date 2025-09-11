import { ModeToggle } from "@/core/ToggeTheme";
import Login from "@/components/login";
import Header from "@/components/Header";
import WithoutAuthMiddleware from "@/components/middlewares/WithoutAuthMiddleware";

export default function Home() {
    return (
        <>
            <ModeToggle />
            <Header />
            <WithoutAuthMiddleware>
                <Login />
            </WithoutAuthMiddleware>
        </>
    );
}
