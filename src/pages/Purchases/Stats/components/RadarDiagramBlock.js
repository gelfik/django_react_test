import RadarDiagram from "../../../../components/RadarDiagram";
import React from "react";

const RadarDiagramBlock = ({item}) => {
    return (<div className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data">
                        <div className="Course__Item__Title">
                            <span>K={item?.k}</span>
                            {item?.countWork && <span>Число выполненых работ: {item?.countWork}</span>}
                        </div>
                    </div>
                    <RadarDiagram data={item}/>
                </div>
            </div>
        </div>
    )
}

export default RadarDiagramBlock;