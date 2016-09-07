module.exports = {

    filesize: function (val) {
        var power = 0,
            prefix = ['', 'K', 'M', 'G', 'T'],
            precision = 0
        while (val > 1024 && power < 5) {
            power++
            val /= 1024
        }
        if (power > 1) {
            precision = 2
        }
        return val.toFixed(precision) + prefix[power] + 'B'
    }

}
