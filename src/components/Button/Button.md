Button example:

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
