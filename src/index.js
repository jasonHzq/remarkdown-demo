import React, { createElement } from 'react';
import Remarkdown from 'remarkdown';

function getClasses(obj) {
  const classNames = Object.keys(obj);

  return classNames.filter(cls => obj[cls]).join(' ');
}

const OPTIONS = [{
  text: 'Demo',
  value: 'demo',
}, {
  text: 'Code',
  value: 'code',
}];

export default class Tab extends React.Component {
  static propTypes = {
    demo: React.PropTypes.any,
  };

  constructor(props) {
    super(props);

    this.state = {
      activeKey: 'demo',
    };
  }

  handleSwitch(activeKey) {
    this.setState({
      activeKey,
    });
  }

  getStyle(key) {
    const { activeKey } = this.state;

    return {
      display: key === activeKey ? 'block': 'none',
    };
  }

  render() {
    const { demo } = this.props;
    const { activeKey } = this.state;
    const tabHeaders = OPTIONS.map(option => {
      const { text, value } = option;
      const classes = getClasses({
        'doc-demo-head-item': true,
        active: activeKey === value,
      });

      return (
        <span
          className={classes}
          key={`doc-demo-head-item-${value}`}
          onClick={this.handleSwitch.bind(this, value)}
        >
        {text}
        </span>
      );
    });
    const demoClasses = getClasses({
      'doc-demo-head-item': true,
      active: activeKey === 'demo',
    });
    const codeClasses = getClasses({
      'doc-demo-head-item': true,
      active: activeKey === 'code',
    });

    return (
      <div className="doc-demo">
        <div className="doc-demo-head">
          {tabHeaders}
        </div>
        <div className="doc-code" style={this.getStyle('code')}>
          <Remarkdown code={demo.selfCode || ''} />
        </div>
        <div className="doc-true-demo" style={this.getStyle('demo')}>
        {createElement(demo, {})}
        </div>
      </div>
    );
  }
}
