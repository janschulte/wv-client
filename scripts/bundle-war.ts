// import { execSync } from 'child_process';
// import { createWriteStream, unlinkSync } from 'fs';

const ch = require('child_process');
const execSync = ch.execSync;

const archiver = require('archiver');
const fs = require('fs');
const createWriteStream = fs.createWriteStream;
const unlinkSync = fs.unlinkSync;
const pjson = require('../package.json');

const appname = pjson.name;
const xmlAsText = `<web-app version="3.0" xmlns="http://java.sun.com/xml/ns/javaee"
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
xsi:schemaLocation="http://java.sun.com/xml/ns/javaee http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd">
    <display-name>Wupperverband helgoland client version ${pjson.version} - built at ${new Date()}</display-name>
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
    <mime-mapping>
        <extension>woff</extension>
        <mime-type>application/font-woff</mime-type>
    </mime-mapping>
    <error-page>
        <error-code>404</error-code>
        <location>/index.html</location>
    </error-page>
</web-app>`;

console.log('Creating web.xml ...');

fs.writeFile('./web.xml', xmlAsText, (errWrite: Error) => {
    if (errWrite) {
        console.log(errWrite);
        console.log('web.xml could not be updated.');
        return;
    } else {
        console.log(`Updated web.xml`);
        buildApplication();
    }
});

function buildApplication() {
    console.log(`Build application ${appname}`);
    execSync(`rimraf dist && npm run ng-high-memory -- build --prod --base-href=/${appname}/`, { stdio: [0, 1, 2] });

    const out = `dist/${appname}.war`;
    const output = createWriteStream(out);
    const archive = archiver('zip', {});

    output.on('finish', () => {
        unlinkSync('web.xml');
        console.log('Finished creation of war (' + out + ') with ' + archive.pointer() + ' total bytes.');
    });

    archive.pipe(output);
    archive.directory(`dist/${appname}`, '/');
    archive.file('web.xml', { name: '/WEB-INF/web.xml' });

    console.log(`Finalizing build application ${appname} ...`);

    archive.finalize();
}
