var koa, combo, request;

koa = require('koa');
combo = require('./index');
request = require('supertest');

var app = koa();
app.use(combo('.'));

describe('Koa Combo', function(){
  it('未合并的css', function(done){
    request(app.listen())
      .get('/assets/a.css')
      .expect('Content-Length', 21)
      .expect('Content-Type', /css/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('未合并的js', function(done){
    request(app.listen())
      .get('/assets/test1.js')
      .expect('Content-Length', 16)
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('合并的css', function(done){
    request(app.listen())
      .get('/assets/??a.css,b.css?t=1')
      .expect('Content-Length', 42)
      .expect('Content-Type', /css/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('合并的js', function(done){
    request(app.listen())
      .get('/assets/??test1.js,test2.js?t=1&tt=2')
      .expect('Content-Length', 32)
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('大文件', function(done){
    request(app.listen())
      .get('/assets/??jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js,jquery-1.11.1.js?t=1')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('中文路径', function(done){
    request(app.listen())
      .get('/assets/??jquery-1.11.1.js,中文目录/a.js?t=1')
      .expect('Content-Type', /javascript/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('要合并的文件没有', function(done){
    request(app.listen())
      .get('/assets/??a.css,b.css,c.css,e.css,f.css?t=1')
      .expect('Content-Length', 42)
      .expect('Content-Type', /css/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('要合并的文件全部没有', function(done){
    request(app.listen())
      .get('/assets/??e.css,c.css,d.css?t=1')
      .expect('Content-Length', 0)
      .expect('Content-Type', /css/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('使用其他的分隔符', function(done){
    var app2 = koa();
    app2.use(combo('.', '&&'));

    request(app2.listen())
      .get('/assets/&&a.css,b.css,c.css?t=1')
      .expect('Content-Length', 42)
      .expect('Content-Type', /css/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });

  it('使用其他的分隔符2', function(done){
    var app2 = koa();
    app2.use(combo('.', 'combo&'));

    request(app2.listen())
      .get('/assets/combo&a.css,b.css,c.css?t=1')
      .expect('Content-Length', 42)
      .expect('Content-Type', /css/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }else{
          done();
        }
      });
  });
});