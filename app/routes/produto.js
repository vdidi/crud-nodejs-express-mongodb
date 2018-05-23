var router = express.Router();
var controller = require('../controller/ProdutoController');

router.get('/', controller.index);