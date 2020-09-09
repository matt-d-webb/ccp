import React, { Component } from 'react';
import { Panel } from 'primereact/components/panel/Panel';
import { API } from 'aws-amplify';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { listEvents } from '../graphql/queries';

export class Dashboard extends Component {

    constructor() {
        super();
        this.state = {
            events: []
        };

    }

    async fetchEvents() {
        const apiData = await API.graphql({ query: listEvents });
        this.setState({ events: apiData.data.listEvents.items })
    }

    componentDidMount() {
        this.fetchEvents();
    }

    render() {

        const footer = (
            <span>
                <Button label="More Info" icon="pi pi-info" className="p-button-secondary p-ml-2" />
                <Button label="Enter" icon="pi pi-check" />
            </span>
        );

        return <div className="p-grid dashboard">
            <div className="p-col-12 p-lg-6 global-sales">
                <Panel header={<span><i className="fa fa-calendar"></i><span>Up Coming Events</span></span>}>
                    <ul>
                        {
                            this.state.events.map(e => {
                                return (
                                <Card title={e.name} subTitle="Standard Play" className="ui-card-shadow" footer={footer}>
                                    <p className="p-m-0">{e.description}</p>
                                </Card>)
                            })
                        }
                    </ul>

                </Panel>
            </div>
            <div className="p-col-12 p-lg-6 global-sales">
                <Panel header={<span><i className="fa fa-globe"></i><span>What's New</span></span>}>
                        <img width="280px" src="/assets/layout/images/matt.png"></img>
                </Panel>
            </div>

        </div>
    }
}
