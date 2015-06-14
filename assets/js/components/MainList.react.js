//jshint esnext:true

var React = require('react');

class MainList extends React.Component {
    componentDidMount() {

    }

    _openOptionsPage() {
        if (chrome.runtime.openOptionsPage) {
            // New way to open options pages, if supported (Chrome 42+).
            chrome.runtime.openOptionsPage();
        } else {
            // Reasonable fallback.
            window.open(chrome.runtime.getURL('options.html'));
        }
    }

    render() {
        var loginLogoutButton = () => {
            if (this.props.loggedIn === true) {
                return (
                    <div>
                        <a href="#" className="list-group-item" onClick={this.props.logoutUser}>
                            <i className="fa fa-fw fa-sign-out"></i>
                            Logout
                        </a>
                    </div>
                );
            }

            return (
                <a target="_blank" href="https://wakatime.com/login" className="list-group-item">
                    <i className="fa fa-fw fa-sign-in"></i>
                    Login
                </a>
            );
        };

        // If logging is enabled, display that info to user
        var loggingStatus = () => {
            if(this.props.loggingEnabled === true && this.props.loggedIn === true)
            {
                return (
                    <div className="row">
                        <div className="col-xs-12">
                            <p>
                                <a href="#" onClick={this.props.disableLogging} className="btn btn-danger btn-block">Disable logging</a>
                            </p>
                        </div>
                    </div>
                );
            }
            else if(this.props.loggingEnabled === false && this.props.loggedIn === true)
            {
                return (
                    <div className="row">
                        <div className="col-xs-12">
                            <p>
                                <a href="#" onClick={this.props.enableLogging} className="btn btn-success btn-block">Enable logging</a>
                            </p>
                        </div>
                    </div>
                );
            }
        };

        var totalTimeLoggedToday = () => {
            if (this.props.loggedIn === true) {
                return (
                    <div className="row">
                        <div className="col-xs-12">
                            <blockquote>
                                <p>{this.props.totalTimeLoggedToday}</p>
                                <small><cite>TOTAL TIME LOGGED TODAY</cite></small>
                            </blockquote>
                        </div>
                    </div>
                );
            }
        };

        return (
            <div>

                {totalTimeLoggedToday()}

                {loggingStatus()}

                <div className="list-group">
                    <a href="#" className="list-group-item" onClick={this._openOptionsPage}>
                        <i className="fa fa-fw fa-cogs"></i>
                        Options
                    </a>

                    {loginLogoutButton()}

                </div>
            </div>
        );
    }
}

export default MainList;
