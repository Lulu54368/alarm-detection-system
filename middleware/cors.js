const whitelist = ["https://open.iot.10086.cn/"]
const whitelistIp = [					
    "183.230.102.83",	"183.230.102.84",	"183.230.102.85",	"183.230.102.86",	"183.230.40.120",	"183.230.40.121",
    "218.201.45.1",	"218.201.45.2",	"218.201.45.3",	"218.201.45.4",	"218.201.45.5",	"218.201.45.6", "127.0.0.1"];

const corsOptionsDelegate = function (req, callback) {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    let corsOptions;

    if (whitelist.indexOf(req.header('Origin')) !== -1 || whitelistIp.indexOf(ip) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {    
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}

module.exports={corsOptionsDelegate}