import { Controller, Get, Post, Body, HttpStatus, HttpCode, Redirect, Param } from '@nestjs/common';
import { RjsService } from './rjs.service';

@Controller('rjs')
export class RjsController {
    constructor (private readonly returnData : RjsService) {}
    @Get('')
    defaultMessage() : string {
        return 'Hello world!';
    }
    
    @Get('users')
    getUsersData() : Promise<any> {
        return this.returnData.returnUsers();
    }

    @Post('/shorten')
    @HttpCode(HttpStatus.CREATED)
    async shortenUrl(@Body('originalUrl') originalUrl: string) {
      const shortUrl = await this.returnData.shortenUrl(originalUrl);
      return { shortUrl };
    }

    @Get('/:shortCode')
    @Redirect()
    async redirectToOriginalUrl(@Param('shortCode') shortCode: string) {
        const originalUrl = await this.returnData.redirectToOriginalUrl(shortCode);
        return { url: originalUrl };
    }
}
