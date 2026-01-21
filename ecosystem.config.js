module.exports = {
    apps: [
        {
            name: "club8s-frontend",
            script: "npm",
            // O "-- --port 3000" passa o argumento para o script interno do vite
            args: "run preview -- --port 3000 --host",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};