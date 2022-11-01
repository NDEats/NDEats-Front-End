import { GoogleLogout } from 'react-google-login';

const clientId = '267889966853-hg5a7futo1vf63prcqc9ahnjpq83b1v1.apps.googleusercontent.com'

function Logout(){
    const onSuccess = () => {
        alert('Logout made successfully');
    };

    return(
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                ></GoogleLogout>
        </div>
    );
}

export default Logout;

