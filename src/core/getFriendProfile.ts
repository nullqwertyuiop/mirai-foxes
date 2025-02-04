import { MiraiError } from '../Error'
import { Profile, UserID } from '../Base'
import axios from 'axios'
/**
 *  获取好友信息
 * @param option 选项
 * @param option.httpUrl    mirai-api-http server 的地址
 * @param option.sessionKey 会话标识
 * @param option.target     好友qq
 * @returns 好友资料
 */
export default async ({
  httpUrl,
  sessionKey,
  target
}: {
  httpUrl: string
  sessionKey: string
  target: UserID
}): Promise<Profile> => {
  // 请求
  const responseData = await axios.get<Profile & { code?: number; msg?: string }>(
    new URL('/friendProfile', httpUrl).toString(),
    {
      params: { sessionKey, target }
    }
  )
  const { data } = responseData
  // 抛出 mirai 的异常
  if (data.code && data.code != 0) {
    throw new MiraiError(data.code, data.msg ?? '')
  }
  return data
}
