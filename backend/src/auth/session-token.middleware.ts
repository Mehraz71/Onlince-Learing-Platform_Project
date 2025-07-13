import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class SessionJwtGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const token = req.session?.jwt;

    if (!token) throw new UnauthorizedException('No session token');

    try {
      const payload = this.jwtService.verify(token);
      req.user = payload;
      console.log("Payload from session JWT:", payload);

      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid session token');
    }
  }
}
