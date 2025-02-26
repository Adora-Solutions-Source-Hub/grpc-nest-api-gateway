import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { Observable, map } from "rxjs";

export interface Response<T> {
  status: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(ctx: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        let message = "OK";

        if (typeof data === "string") {
          message = data;
          data = null;
        }

        if (data?.status >= 400) {
          message = data.message;
          data = {};
          return {
            data,
            message,
            status: 400,
          };
        }
        if (data?.message && data?.message != "") {
          message = data.message;
          if (data.data) {
            data = data.data;
          } else {
            delete data.message;
            data = data || null;
          }
        }

        if (data?.items && data?.pagination) {
          // console.log('🚀 ~ map ~ data:', data);
          return {
            data: data.items,
            pagination: data.pagination,
            message,
            status: 200,
          };
        }

        return {
          data,
          message,
          status: 200,
        };
      }),
    );
  }
}
