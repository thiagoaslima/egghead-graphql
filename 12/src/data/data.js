const videoA = {
    id: 'A',
    title: 'video A',
    duration: 120,
    watched: true
};

const videoB = {
    id: 'B',
    title: 'video B',
    duration: 160,
    watched: false
};

let videos = [videoA, videoB];

const getVideoById = (id) => new Promise((resolve) => {
    const [video] = videos.filter(video => video.id === id);
    resolve(video);
});

const getVideos = () => new Promise(resolve => resolve(videos));

const createVideo = ({title, duration, watched}) => {
    const video = {
        id: (new Buffer(title, 'utf8')).toString('base64'),
        title,
        duration,
        watched
    };

    videos.push(video);

    return video;
}

exports.getVideoById = getVideoById;
exports.getVideos = getVideos;
exports.createVideo = createVideo;