import { withAuth } from "next-auth/middleware";
import { NextResponse, NextRequest } from "next/server";

export default withAuth(
    function middleware(){
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized ({req,token}){
                const {pathname} = req.nextUrl;
                if(
                    pathname.startsWith("api/auth") ||
                    pathname === "/login" ||
                    pathname === "/register" ||
                    pathname === "/about" ||
                    pathname === "/convert"
                    // pathname === "/" ||
                    // pathname.startsWith("/api/images")
                ){
                    return true;
                }

                // return true;

                if(pathname === "/" || pathname.startsWith("/api/images")){
                    return true;
                }

                return !!token;
            }

        }
    }
);

export const config = {
    matcher:[
        /*
        * Match all request paths except:
        * - _next/static (static files)
        * - next/image (image optimization files)
        * - favicon.ico (favicon file)
        * - public folder
        */
        "/((?!_next/static|_next/image|favicon\\.ico|public/).)*",
    ],
};