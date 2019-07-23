import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAsistenciaComponent } from './video-asistencia.component';

describe('VideoAsistenciaComponent', () => {
  let component: VideoAsistenciaComponent;
  let fixture: ComponentFixture<VideoAsistenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoAsistenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
