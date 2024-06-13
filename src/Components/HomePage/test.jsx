import { useState, useEffect } from "react";
import './test.styles.css';

const Test = () => {
    const text = 'Hello World!';
    const [list1, setList1] = useState([text]);
    const [list2, setList2] = useState([]);
    const [transitionClass1, setTransitionClass1] = useState('');
    const [transitionClass2, setTransitionClass2] = useState('');

    const onClickHandler = () => {
        if (list1.length > 0) {
            // Add fade-out class
            setTransitionClass1('fade-out');
            setTimeout(() => {
                setList2(list1);
                setList1([]);
                setTransitionClass1('');
                setTransitionClass2('fade-in');
                setTimeout(() => {
                    setTransitionClass2('');
                }, 500);
            }, 500);
        } else if (list2.length > 0) {
            // Add fade-out class
            setTransitionClass2('fade-out');
            setTimeout(() => {
                setList1(list2);
                setList2([]);
                setTransitionClass2('');
                setTransitionClass1('fade-in');
                setTimeout(() => {
                    setTransitionClass1('');
                }, 500);
            }, 500);
        }
    }

    return (
        <div>
            <p>this is List 1 : </p>
            {list1 && list1.map((item, index) => {
                return (
                    <span key={index} className={`itemInList1 ${transitionClass1}`}>{item}</span>
                )
            })}<br />
            <button className="btn" onClick={onClickHandler}>click</button><br />
            <p>this is List 2 : </p>
            {list2 && list2.map((item, index) => {
                return (
                    <span key={index} className={`itemInList2 ${transitionClass2}`}>{item}</span>
                )
            })}
        </div>
    )
};

export default Test;
