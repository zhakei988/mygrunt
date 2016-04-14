module.exports = {
    fs: require('fs'),
    fnll:function(str)
    {
        //console.log("未传入返回函数");
    },
    typefn:function(fn,txt)
    {
        _this=this;
        if(typeof(fn)=='undefined')
        {
             _this.fnll.call(fn,txt);
        }
        else
        {
            fn(txt);  
        }
    },
    exists: function(str,fn) {
        //是否存在文件
        _this = this;
        _this.fs.exists(str, function(exists) {
            _this.typefn(fn,exists)
        })
    },
    readFile: function(str,fn) {
        //读取文件内容
        // 使用异步回调的方式 因为是异步的，所以对于数据读取完后的操作我们需要使用回调的方式进行处理
        // 这点对于习惯事件操作的前端开发应该是习以为常的 。
        _this = this;
        _this.fs.readFile(str, function(err, data) {
            if (err) {
                _this.typefn(fn,err)
                console.log(err);
            } else {
                _this.typefn(fn,data)
                console.log(data.length);
            }
        });
    },
    writeFile: function(str, cont,fn) {
        //写入文件
        _this = this;
        _this.fs.writeFile(str, cont, function(err) {
            if (err)
            {
                _this.typefn(fn,err)
                console.log(err);
            } 
            else
            {
            _this.typefn(fn,true)
            //console.log('add ' + str + ' success!');
            }
        });
    },
    unlink: function(str,fn) {
        // 删除文件
        _this = this;
        _this.fs.unlink(str, function() {
            _this.typefn(fn,true)
            console.log('delete ' + str + ' success');
        });
    },
    rename: function(str, ustr,fn) {
        // 修改文件名称
        _this = this;
        _this.fs.rename(str, ustr, function(err) {
            if(err)
            {
                _this.typefn(fn,err)
            }else
            {
                _this.typefn(fn,true)
            console.log('rename success')
            }
        })
    },
    stat: function(str) {
        // 查看文件状态
        _this = this;
        fs.stat(str, function(err, stat) {
            _this.typefn(fn,stat)
            console.log(stat);
        });
    }
};