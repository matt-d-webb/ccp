import React, { useState } from 'react';
import { Panel } from 'primereact/components/panel/Panel';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputMask } from 'primereact/inputmask';
import { Auth, Storage } from "aws-amplify";
import './Profile.css'

import avatar from "./default-avatar.png";

export function Profile() {

    const [userInfo, setUserInfo] = React.useState({
        id: '',
        username: '',
        attributes: {
            email: '',
            phone_number: ''
        }
    });

    const [image, setImage] = useState(avatar);
    Storage.configure({ track: true, level: "public" });

    const onPageRendered = async () => {
        getProfilePicture();
    }

    const getUserInfo = async () => {
        const info = await Auth.currentUserInfo();
        setUserInfo({ id: info.id, username: info.username, attributes: info.attributes });
    }

    const getProfilePicture = () => {
            Storage.get(`${userInfo.id}-avatar.png`)
            .then(url => {
                var myRequest = new Request(url);
                fetch(myRequest).then(function (response) {
                    if (response.status === 200) {
                        setImage(url);
                    }
                });
            })
            .catch(err => console.log(err));
    };

    let fileInput = React.createRef();

    const onOpenFileDialog = () => {
        fileInput.current.click();
    };


    const onProcessFile = e => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        try {
            reader.readAsDataURL(file);
        } catch (err) {
            console.log(err);
        }
        reader.onloadend = () => {
            setImage(reader.result);
        };

        Storage.put(`${userInfo.id}-avatar.png`, file, {
            contentType: "image/png"
        })
            .then(result => console.log(result))
            .catch(err => console.log(err));
    };

    React.useEffect(() => {
        getUserInfo();
        onPageRendered();
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
                                <a href="#">
                                    <input
                                        type="file"
                                        onChange={onProcessFile}
                                        ref={fileInput}
                                        hidden={true}
                                    />
                                    <img src={image} className="profile-avatar" onClick={onOpenFileDialog} />
                                </a>
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
