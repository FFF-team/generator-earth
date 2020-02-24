async function filterFavicon(ctx, next) {
    let isFavicon = /\/favicon\.ico$/.test(ctx.path);
    
    // in case favicon, break middleware chain
    if (isFavicon) {
        ctx.body = '';
        return;
    }
    
    await next();
}



module.exports = filterFavicon;