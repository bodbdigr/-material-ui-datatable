import Avatar from '@material-ui/core/Avatar';
import { css } from 'emotion';
import { DataTable } from 'material-ui-datatable';
import * as React from 'react';

interface IUser {
  avatar: string;
  department: string;
  name: string;
}

const data:IUser[] = [
  {
    avatar: '/assets/JohnDoe200x.png',
    department: 'Sales',
    name: 'John Doe',
  },
  {
    avatar: '/assets/JaneDoe200x.png',
    department: 'Development',
    name: 'Jane Doe',
  }
];

const container = css`
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #c0c0c0;
  margin-top: 10px;
`;

const wrapper = css`
  position: absolute;
  width: 100%;
  padding: 0;
  margin: 0;
`;

class App extends React.Component {
  public render() {
    return (
      <div className={wrapper}>
        <div className={container}>
          <DataTable<IUser>
            rows={[
              {
                handler: (user:IUser) => (
                  <div>
                    <Avatar src={user.avatar} />
                  </div>
                ),
                title: 'Avatar',
              },
              {
                field: 'name',
                title: 'User Name',
              },
              {
                field: 'department',
                title: 'Department',
              }
            ]}
            source={data}
            title="Users"
            selectable={false}
            loading={false}
          />
        </div>
      </div>
    );
  }
}

export default App;
