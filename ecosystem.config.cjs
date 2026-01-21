module.exports = {
    apps: [
        {
            name: "club8s-ssr",
            // O script deve ser o ponto de entrada do seu servidor Node
            script: "./server/index.js",
            instances: "max", // Escala para todos os núcleos da CPU (modo cluster)
            exec_mode: "cluster",
            watch: false, // Em produção, deixe false para evitar restarts infinitos
            env: {
                NODE_ENV: "production",
                PORT: 3000
            }
        }
    ]
};