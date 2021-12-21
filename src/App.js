import './App.css';
import React from 'react';
import $ from 'jquery';


/*https://api.github.com/repos/microsoft/typescript/contributors?per_page=10*/
class App extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        list: null,
        page: 0,
      }
    }

    resetContributor = async () => {
      await this.setState({page:0})
      this.nextContributor()
    }

    nextContributor = async () => {

      const page = Number.parseInt(this.state.page) + 1;
      await $.get('https://api.github.com/repos/microsoft/typescript/contributors?per_page='+page, async (data,status,xhr)=>{
          if (status==='success'){
            await this.setState({list:data,page:page})
          }
      })
    }


    async componentDidMount() {
      this.nextContributor()
    }

    render (){

      let list = Object.assign([],this.state.list).map(item=>{
        return (
          <tr key={item.login}>
             <td><img className="contribimg" src={item.avatar_url} alt={item.login}/></td>
             <td>{item.login}</td>
          </tr>
        )
      })

      return (
        <div>
        <h1>Contributors</h1>
        <button onClick={this.resetContributor} className='contribbtn'>reset</button>
        <button onClick={this.nextContributor} className='contribbtn'>next</button>

        <table>
          <thead>
          	<tr>
          		<th className="contrib_thavatar">url_avatar</th>
          		<th className="contrib_thuser">login</th>
          	</tr>
          </thead>
          <tbody>
       	      { list }
          </tbody>
        </table>
        </div>
      )
    }
}

export default App;
