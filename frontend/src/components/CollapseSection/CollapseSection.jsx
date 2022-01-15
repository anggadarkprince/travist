import React, {useEffect, useState} from "react";
import CollapseItem from "./CollapseItem";

export default function CollapseSection(props) {

    const getInitialActive = (lists, initialActive) => {
        if (initialActive !== undefined) {
            if (initialActive >= 0 && initialActive <= lists.length) {
                return initialActive
            }
            return 0
        }

        let foundIndex = 0
        lists.forEach((item, index) => {
            if (item.active) {
                foundIndex = index
            }
        });

        return foundIndex
    }

    const initialActive = getInitialActive(props.lists, props.initialActive || 0);
    const [activeIndex, setActiveIndex] = useState(initialActive)
    const [isRunning, setIsRunning] = useState(props.interval > 0)
    let timer;

    useEffect(() => {
        if (isRunning) {
            timer = setInterval(updateCollapse, props.interval * 1000)

            return () => {
                clearInterval(timer)
                timer = setInterval(updateCollapse, props.interval * 1000)
            }
        }
    }, [isRunning])

    const updateCollapse = () => {
        setActiveIndex(prevIndex => {
            let nextIndex = prevIndex + 1
            if (nextIndex >= props.lists.length) {
                nextIndex = 0
            }
            return nextIndex
        })
    }

    const onChangeCollapse = (index) => {
        setIsRunning(false)
        setActiveIndex(index)
    }

    return (
        <ul className="aboutSectionList">
            {
                props.lists.map((item, index) => {
                    const isActive = item.active || false;
                    const sectionClass = `aboutSectionListItem${activeIndex === index ? ' active' : ''}`
                    return (
                        <li className={sectionClass} key={`${item.title}-${index}`}>
                            <CollapseItem
                                title={item.title} active={isActive}
                                onTitleClicked={() => onChangeCollapse(index)}>
                                {item.content}
                            </CollapseItem>
                        </li>
                    )
                })
            }
        </ul>
    )
}