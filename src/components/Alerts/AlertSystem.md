### Default Alert System with slide-in

```jsx

const ExampleAlertSystemDefault = () => {

    const [alerts,setAlerts] = React.useState([])
    const [alertText,setAlertText] = React.useState('Alert Text')
    
    const onCloseCallback = alert => {
        console.log(alert)
    }

    const addAlert = type => {
        let temp = alerts.concat()

        temp.push({ type: type, content: alertText, onClose: this.onCloseCallback, timeout: 5000 })

        setAlerts(temp);
    }

    return (
        <div>
            <Input value='Alert text' placeholder='Alert text' ref={c => setAlertText(c)} />
            <div>
                <Button onClick={addAlert('success')} optClass="success">Add Success Alert</Button>
                <Button onClick={addAlert('warning')} optClass="warning">Add Warning Alert</Button>
                <Button onClick={addAlert('info')} optClass="default">Add Info Alert</Button>
                <Button onClick={addAlert('danger')} optClass="danger">Add Danger Alert</Button>
            </div>
            <AlertSystem alerts={alerts} slideIn={true} />
       </div>
    )
}

<ExampleAlertSystemDefault />

```