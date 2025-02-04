import { Container } from 'inversify';
import TYPES from '../types/Types';
import { Interactorable } from '../interactors/Interactorable';
import { Interactor } from '../interactors/Interactor';
import { Viewable } from '../views/Viewable';
import { View } from '../views/View';
import { Presenterable } from '../presenters/Presenterable';
import { Presenter } from '../presenters/Presenter';
import { Routerable } from '../routers/Routerable';
import { Router } from '../routers/Router';
import { Serviceable } from '../shared/services/Serviceable';
import { Service } from '../services/Service';
import { Authenticationable } from '../shared/services/Authenticationable';
import { Authentication } from '../services/Authentication';
import { Authorizationable } from '../shared/services/Authorizationable';
import { Authorization } from '../services/Authorization';
import { Sessionable } from '../shared/services/Sessionable';
import { Session } from '../services/Session';
import { Tokenizerable } from '../shared/services/Tokenizerable';
import { Tokenizer } from '../services/Tokenizer';
import { Historyable } from '../shared/services/Historyable';
import { History } from '../services/History';
import { Loggerable } from '../shared/services/Loggerable';
import { Logger } from '../services/Logger';
import { Notificationable } from '../shared/services/Notificationable';
import { Notification } from '../services/Notification';
import { ApiRouter } from '../routers/ApiRouter';

const container = new Container();

container.bind<Viewable>(TYPES.View).to(View);
container.bind<Interactorable>(TYPES.Interactor).to(Interactor);
container.bind<Presenterable>(TYPES.Presenter).to(Presenter);
container.bind<Routerable>(TYPES.Router).to(Router);
container.bind<Serviceable>(TYPES.Service).to(Service);
container.bind<Authenticationable>(TYPES.Authentication).to(Authentication);
container.bind<Authorizationable>(TYPES.Authorization).to(Authorization);
container.bind<Sessionable>(TYPES.Session).to(Session);
container.bind<Tokenizerable>(TYPES.Tokenizer).to(Tokenizer);
container.bind<Historyable>(TYPES.History).to(History);
container.bind<Loggerable>(TYPES.Logger).to(Logger);
container.bind<Notificationable>(TYPES.Notification).to(Notification);

// Bind ApiRouter
container.bind<ApiRouter>(Symbol.for('ApiRouter')).to(ApiRouter);

export default container;
