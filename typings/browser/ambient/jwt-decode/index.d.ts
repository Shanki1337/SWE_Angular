// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/7de6c3dd94feaeb21f20054b9f30d5dabc5efabd/jwt-decode/jwt-decode.d.ts
// Type definitions for jwt-decode v1.4.0
// Project: https://github.com/auth0/jwt-decode
// Definitions by: Giedrius Grabauskas <https://github.com/QuatroDevOfficial/>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


declare namespace JwtDecode {
    interface JwtDecodeStatic {
        (token: string): any;
    }
}

declare module 'jwt-decode' {
    var jwtDecode: JwtDecode.JwtDecodeStatic;
    export = jwtDecode;
}