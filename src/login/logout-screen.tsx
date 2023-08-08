
import { Button } from "@/components/ui/button"
import { userService } from "@/services/user.service"


const LogoutScreen = ({ username }: {username: string}) => {
    const logout = () => {
        userService.logout()
    }

    return (<div>
        <p style={{margin: '15px'}}>You are already logged in as: {username}  </p>
        <p style={{textAlign: 'center'}}><Button onClick={logout}>Logout</Button></p>
    </div>)
}

export default LogoutScreen