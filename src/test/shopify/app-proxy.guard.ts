// app-proxy.guard.ts
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';

@Injectable()
export class AppProxyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { signature, ...params } = req.query as Record<string, string | string[]>;
    // 1-2. 去掉 signature，按 key 排序，拼接成 key=value，不加分隔符
    const message = Object.keys(params)
      .sort()
      .map((key) => {
        const value = params[key];
        return `${key}=${Array.isArray(value) ? value.join(',') : value}`;
      })
      .join('');
    
    // 3. 用客户端加密密钥计算 HMAC-SHA256
    const digest = createHmac('sha256', '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')
      .update(message)
      .digest('hex');

    // 4. 安全比较
    const a = Buffer.from(digest);
    const b = Buffer.from(String(signature));
    if (a.length !== b.length || !timingSafeEqual(a, b)) {
      throw new UnauthorizedException('签名无效');
    }

    // 可选：拒绝 5 分钟前的请求，防止旧链接被重复使用
    const ts = Number(params.timestamp);
    if (!ts || Math.abs(Date.now() / 1000 - ts) > 300) {
      throw new UnauthorizedException('请求已过期');
    }

    return true;
  }
}