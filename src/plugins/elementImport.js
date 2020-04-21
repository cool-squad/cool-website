import { Row, Col, Container } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

export default (Vue) => {
  Vue.component(Row.name, Row);
  Vue.component(Col.name, Col);
  Vue.component(Container.name, Container);
};
