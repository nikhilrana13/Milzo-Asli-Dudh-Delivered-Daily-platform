import { Store } from "../redux/Store"
import { UserSavedAddressesApi } from "../redux/api/UsersavedAddressesApi"

export const resetAllApiCache = () => {
   Store.dispatch(
      UserSavedAddressesApi.util.resetApiState()
   )

}