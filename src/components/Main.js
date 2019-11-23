import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Game from './Game/Game';

export default function Main() {  
    return (
     <main>
      <Switch>
        <Route path='/Game' component={Game}/>
        <Route path='/'/>
      </Switch>
     </main>
  )
}