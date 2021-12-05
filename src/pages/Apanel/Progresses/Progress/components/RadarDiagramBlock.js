import RadarDiagram from "../../../../../components/RadarDiagram";
import React from "react";

const RadarDiagramBlock = ({list}) => {
    return list?.map((item, i) =>
        <div key={i} className="Course__Item">
            <div className="Course__Item__Content">
                <div className="Course__Item__Header">
                    <div className="Course__Item__Data">
                        <div className="Course__Item__Avatar">
                            <img src={`${item?.user?.avatar?.file?.original}`} alt=''/>
                        </div>
                        <div className="Course__Item__Title">
                            <p>{item?.user?.firstName} {item?.user?.lastName}</p>
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