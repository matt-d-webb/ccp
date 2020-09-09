import React from 'react';
import { Panel } from 'primereact/components/panel/Panel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { Auth } from 'aws-amplify';
import './Profile.css'

export function Profile() {

    const [userInfo, setUserInfo] = React.useState({
        username: '',
        attributes: {
            email: '',
            phone_number: ''
        }
    });

    const getUserInfo = async () => {
        const info = await Auth.currentUserInfo();
        setUserInfo({ username: info.username, attributes: info.attributes });
    }

    React.useEffect(() => {
        getUserInfo();
    }, [])

    return (<div className="p-grid">
        <div className="p-col-12">
        <div className="help-wrapper">
        <div className="help-header">
            <div className="p-grid header-title">
                <div className="p-col-2 icon">
                    <i className="fa fa-users" />
                </div>
                <div className="p-col-9">
                    <h1>Your Profile</h1>
                    <span>Edit your information and keep us up to date!</span>
                </div>
            </div>
        </div>
        <div className="p-col-6">
            <Panel header={<span><i className="fa fa-user"></i><span> Details</span></span>}>
                <div className="p-grid">
                    <div className="p-col-6">
                        <h4>Email</h4>
                        <InputText value={userInfo.attributes.email} disabled={true} />
                        <h4>Username</h4>
                        <InputText value={userInfo.username} disabled={true} />
                        <h4>Contact No.</h4>
                        <InputMask mask="+(99) 999 999 99999" value={userInfo.attributes.phone_number} disabled={true}></InputMask>
                    </div>
                    <div className="p-col">
                        <h4>Bio</h4>
                        <InputTextarea rows={5} cols={30} autoResize />
                        <h4>ECF No.</h4>
                        <InputText value={userInfo.ecf_number} />
                        <h4>Fide No.</h4>
                        <InputText value={userInfo.fide_number} />
                    </div>
                </div>
            </Panel>
        </div>
        </div>
        </div>
    </div>)
}
