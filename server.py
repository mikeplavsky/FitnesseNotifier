import cherrypyfrom cherrypy import exposedef retry(func, num = 5):    while (num > 0):                try:                func()                            break                    except IOError:                             num -= 1class Root:        @expose    def startTests(self,tests,callback):            def start():                def startTest(name):                             file = open( r'FitNesseRoot\files\testProgress\\' + name, 'w' )                file.close()                            [startTest(x) for x in tests.split( ';' )];                    retry( start )                return callback + "('done!')";              @expose    def stopAllTests(self,callback):            def stop():                        import os               path = r'FitNesseRoot\files\testProgress';                    [os.remove(path + '\\' + x) for x in os.listdir( path )]                            retry( stop )                return callback + "('done!')";              @expose    def stopTests(self,tests,callback):            def stop():                def stopTest(test):                                import os                os.remove( r'FitNesseRoot\files\testProgress\\' + test )                            [stopTest(x) for x in tests.split(';')]                    retry( stop )                return callback + "('done!')";                 app = cherrypy.quickstart( Root(), config = "config.txt" )