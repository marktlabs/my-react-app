import React, { Component, Fragment } from 'react';
import { Row} from 'react-materialize';
import Dropdown from '../Dropdown/Dropdown';
import DropdownScreen from '../DropdownScreen/DropdownScreen';

import './PromoLoop.css';


const videoName = [
    { name: 'promo 1.mp4', key: 1 },
    { name: 'promo 2.mp4', key: 2 },
    { name: 'promo 3.mp4', key: 3 },
];

const screenName = [
    { name: 'screen 1', key: 1 },
    { name: 'screen 2', key: 2 },
    { name: 'screen 3', key: 3 },
];

const timeNumberMin = [];

const timeNumberHour = [];

const timeNumber = [];

for(let i = 0 ; i <= 59 ; i++ ) {
    timeNumberMin.push({name: `${i}`, key: i})
}

for(let i = 0 ; i <= 23 ; i++ ) {
    timeNumberHour.push({name: `${i}`, key: i})
}


for (let i=0; i <= 23 ; i++){

    for (let j=0 ; j<= 59 ; j=j+15){
        
        if (i<10 && j < 10)
        {
            timeNumber.push({key: `0${i}:0${j}`, name: `0${i}:0${j}`});
        }

        if (i<10 && j >= 10)
        {
            timeNumber.push({key: `0${i}:${j}`, name: `0${i}:${j}`});
        }

        if (i>=10 && j >= 10)
        {
            timeNumber.push({key: `${i}:${j}`, name: `${i}:${j}`})
        }
        
    }

}


class PromoLoop extends Component {


    state = {
        screenName: '',
        schedules: [
            {
                video: 1,
                start: 0,
                end: 0,
            },
        ]
    }


    handleScheduleChange = (index, name, value) => {
        console.log(index);
        const schedules = this.state.schedules;
        const scheduleToModify = schedules[index];

        scheduleToModify[name] = value;
        schedules[index] = scheduleToModify;

        this.setState({schedules}, () => {
            console.log(this.state.schedules[index]);
        });
    }


    handleScheduleChange = (index, name, value) => {
        console.log(index);
        const schedules = this.state.schedules;
        const scheduleToModify = schedules[index];

        scheduleToModify[name] = value;
        schedules[index] = scheduleToModify;

        this.setState({schedules}, () => {
            console.log(this.state.schedules[index]);
        });
    }


    handleScreenChange = (name, value) => {
        //console.log(value);
        //const screen = this.state.screenName;

        this.setState({ screenName: value});

        /*
        this.setState({screen}, () => {
            screenName: value;
            console.log(this.state.screenName);
        });
        */
    }


    handleSubmit = () => {
        this.props.handleSubmit(this.state.schedules);
    }


    setNewTrigger = () => {
        let newTrigger = "promoLoop";
        this.props.setNewTrigger(newTrigger);
        console.log("newTrigger");
    }


    sendToDb = () => {
        console.log("Clicked!")
        this.setState(prevState => {
            console.log("video ",this.state.schedules[0].video);
            console.log("start ",this.state.schedules[0].start);
            console.log("end ",this.state.schedules[0].end);
            console.log("the screenName is: ",this.state.screenName);
        });
    }

 
    render() {
        return (
            <div className="PromoLoop" >
                <div className="row">

                    <div className="col s12">
                        
                        <p className="subtitlesHead2"> Select the screen for scheduling content </p>

                        <DropdownScreen 
                            handleChange={this.handleScreenChange}
                            name="video"
                            items={screenName}
                        />
                            
                        
                    </div>

                    <div className="col s12">
                        <p className="subtitlesHead2" > Set time for video promo looping </p>
                    {
                        this.state.schedules.map((value, index, key) => (
                            <Fragment key={index}>
                                <div className="row">

                                    <div className="col s4">
                                        <Row >
                                            <Dropdown 
                                                handleChange={this.handleScheduleChange}
                                                name="video"
                                                index={index} 
                                                items={videoName} />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <Dropdown handleChange={this.handleScheduleChange} name="start" index={index} items={timeNumber} />
                                        </Row >
                                    </div>

                                    <div className="col s4">
                                        <Row >
                                            <Dropdown handleChange={this.handleScheduleChange} name="end" index={index} items={timeNumber} />
                                        </Row >
                                    </div>
                                </div>
                            </Fragment>
                        ))
                    }
                    </div>
                    

                <div className="row">
                    <div className="col12">
                        <input className='buttonSubmit' 
                            onClick={() => {
                                this.sendToDb();
                            }}
                        type="submit" value="Submit"  />
                      
                    </div>
                </div>
            </div>
           </div>
        )
    }
}
export default PromoLoop;



