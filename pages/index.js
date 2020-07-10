import { Layout, EventCalendar } from "../src/components";
import { connect } from "react-redux";

class Index extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <Layout>
        <div>
          {user &&
            <EventCalendar user={user} />
          }
        </div>
      </Layout>
    )
  }
}

export default connect(state => state)(Index)