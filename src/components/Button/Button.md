### Button example:
```js
    <Button>Naked Button</Button>

    <Button optClass="secondary" collapse={true}>
        <Icon name="md-add" height="14" width="14" />
        <span>Icon Before</span>
    </Button>

    <Button optClass="secondary" collapse={true}>
        <span>Icon After</span>
        <Icon name="md-check" height="14" width="14" />
    </Button>

    <Button optClass="secondary" collapse={true}>
        <Icon name="md-filter" height="14" width="14" />
        <span>Icon Both</span>
        <Icon name="md-check" height="14" width="14" />
    </Button>

    <Button optClass="secondary" collapse={true}>
        <Icon name="md-filter" height="14" width="14" />
        <span>Icon Both</span>
        <Icon name="mbsy-caret" height="10" width="10" />
    </Button>
```

### Button with confirmation callback
```jsx

const ExampleButtonConfirmationCallback = () => {

    const [status, setStatus] = React.useState('Callback was not fired.')
    const style = {}

    const handleConfirmation = event => {
        setStatus('Callback was fired.', () => {
        setTimeout(() => {
            setStatus('Callback was not fired.')
        }, 3000)
        })
    }

    return (
      <div>
        <div className={style['custom-confirmation-wrapper']}>
          <ButtonConfirmation prompt={'Would you like to see the callback fire?'} position={'left'} handleConfirmation={handleConfirmation}>Test</ButtonConfirmation>
        </div>
        <code className={style['callback-status']}>{status}</code>
      </div>
    )
}

<ExampleButtonConfirmationCallback />
```