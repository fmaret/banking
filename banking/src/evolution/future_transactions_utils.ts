import Cookies from 'js-cookie';
import FutureTransaction from '../../types/FutureTransaction'

export function loadFutureTransactions(): FutureTransaction[] {
    const cookies: string | undefined = Cookies.get("futureTransactions")
    const futureTransactions: Array<FutureTransaction> = (cookies ? JSON.parse(cookies) : [])
    return futureTransactions
  }