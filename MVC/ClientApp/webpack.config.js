const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: {
        site: './src/js/site.ts',
        index: './src/js/Index.ts',
        validation: './src/js/Validation.ts',
        step: './src/js/Flow/StepAPI.ts',
        theme: './src/js/Theme/ThemeAPI.ts',
        mainThemeDetails: './src/js/Theme/MainThemeDetailsAPI.ts',
        subTheme: './src/js/Theme/SubTheme/SubTheme.ts',
        webcam: './src/js/Webcam/WebCamDetection.ts',
        login: './src/js/Login/login-animation.ts',
        project: './src/js/Project/Project.ts',
        dashboard: './src/js/Dashboard/Dashboard.ts',
        flowCreator: './src/js/CreateFlow/FlowCreator.ts',
        facilitator: './src/js/Flow/Facilitator.ts',
        kiosk: './src/js/Kiosk/Kiosk.ts',
        flow: './src/js/Kiosk/Flow.ts',
        deleteFlowModal: './src/js/CreateFlow/DeleteFlowModal.ts',
        deleteFlowAPI: './src/js/CreateFlow/API/DeleteFlowAPI.ts',
        flowEditor: './src/js/CreateFlow/FlowEditor.ts',
        navigation: './src/js/Layout/Navigation.ts',
        systemDashboard: "./src/js/SystemDashboard/Dashboard.ts",
        webapp: "./src/js/Webapp/Dashboard.ts",
        notes: "./src/js/Project/Notes.ts",
        statistics: "./src/js/Statistics/Statistics.ts"
    },
    output: {
        filename: '[name].entry.js',
        path: path.resolve(__dirname, '..', 'wwwroot', 'dist'),
        clean: true,
    },
    devtool: 'source-map',
    mode: 'development',
    resolve: {
        extensions: [".ts", ".js"],
        extensionAlias: {
            '.js': ['.js', '.ts'],
        },
        modules: ['node_modules', path.resolve(__dirname, "src")],
        fallback: {
            fs: false,
            path: false,
            crypto: false,
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: path.resolve(__dirname, 'tsconfig.json'),
                extensions: ['.ts', '.js'],
            })
        ]
    },
    module: {
        rules: [
            {
                test: /\.ts?$/i,
                use: 'ts-loader',
                exclude: [/node_modules/, /custom npm packages/]
            },
            {
                test: /\.s?css$/,
                use: [{loader: MiniCssExtractPlugin.loader}, 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: "asset/resource"
            },
            {
                test: /\.(eot|woff(2)?|ttf|otf|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(mp3|wav|ogg|mp4|webm|mkv)$/i,
                type: 'asset/resource'
            },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        })
    ]
}
